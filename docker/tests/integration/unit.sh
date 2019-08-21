printUsage () {
  echo ""
  echo "Usage:"
  echo '-b      branch: (current branch as default)'
  echo '-e      extra parameters: Must be send inside quotes "'
  echo '-r      [no arguments] run only: Will not executed a build of the image, use the -r option if an image was already generated'
  echo '-c      [no arguments] cache: allows to use the docker cache otherwhise "--no-cache" will be use when building the image'
  echo ""
  echo "============================================================================"
  echo "============================================================================"
  echo "         Examples:"
  echo ""
  echo "         ./unit.sh"
  echo "         ./unit.sh -r"
  echo "         ./unit.sh -c"
  echo "         ./unit.sh -b origin/master"
  echo "         ./unit.sh -b myBranchName"
  echo '         ./unit.sh -e "--debug-jvm"'
  echo '         ./unit.sh -e "--tests *HTMLPageAssetRenderedTest"'
  echo '         ./unit.sh -e "--debug-jvm --tests *HTMLPageAssetRenderedTest"'
  echo "============================================================================"
  echo "============================================================================"
  echo ""
  echo "Note:"
  echo "If -b option is not use current branch will be use."
  echo "By default we build the image using the --no-cache option, if cache is required the -c option should be use."
}

buildImage=true
useCache=false

while getopts "b:e:g:rch" option; do
  case ${option} in

  b) branchOrCommit=${OPTARG} ;;
  g) gitHash=${OPTARG} ;;
  e) extra=${OPTARG} ;;
  r) buildImage=false ;;
  c) useCache=true ;;
  h) printUsage
    exit 1
    ;;
  *)
    printUsage
    exit 1
    ;;
  esac
done

echo ""
BUILD_IMAGE_TAG="unit-tests"

if [ -z "${gitHash}" ]; then
  gitHash=$(git rev-parse HEAD)
  echo " >>> git hash parameter NOT FOUND, using current git commit hash [${gitHash}]"
fi

if [ -z "${branchOrCommit}" ]; then

  foundBranchName=$(git symbolic-ref -q HEAD)
  foundBranchName=${foundBranchName##refs/heads/}
  foundBranchName=${foundBranchName:-HEAD}

  echo " >>> Branch or commit parameter NOT FOUND, using current branch [${foundBranchName}]"
  branchOrCommit=${foundBranchName}
fi
echo ""

# Creating required folders
mkdir -p output

if [ "$buildImage" = true ]; then

  # Building the docker image for a given branch
  if [ "$useCache" = true ]; then
    docker build --pull \
      --build-arg BUILD_FROM=COMMIT \
      --build-arg BUILD_ID=${branchOrCommit} \
      --build-arg BUILD_HASH=${gitHash} \
      -t ${BUILD_IMAGE_TAG} .
  else
    docker build --pull --no-cache \
      --build-arg BUILD_FROM=COMMIT \
      --build-arg BUILD_ID=${branchOrCommit} \
      --build-arg BUILD_HASH=${gitHash} \
      -t ${BUILD_IMAGE_TAG} .
  fi

fi

if [ ! -z "${extra}" ]; then
  echo ""
  echo " >>> Running with extra parameters [${extra}]"
  echo ""
  export EXTRA_PARAMS=${extra}
fi

# Starting the container for the build image
export IMAGE_BASE_NAME=${BUILD_IMAGE_TAG}
docker-compose -f unit-service.yml \
  up \
  --abort-on-container-exit

# Required code, without it the script will exit and won't be able to down the containers properly
testsReturnCode=$?

# Cleaning up
docker-compose -f unit-service.yml down

echo
echo -e "\e[36m==========================================================================================================================\e[0m"
echo -e "\e[36m==========================================================================================================================\e[0m"
echo
if [ ${testsReturnCode} == 0 ]
then
  echo -e "\e[1;32m                                 >>> Unit tests executed SUCCESSFULLY <<<\e[0m"
else
  echo -e "\e[1;31m                                       >>> Unit tests FAILED <<<\e[0m"
fi
echo
echo -e "\e[36m==========================================================================================================================\e[0m"
echo -e "\e[36m==========================================================================================================================\e[0m"