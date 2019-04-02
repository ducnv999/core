
package com.dotmarketing.business.portal;

import java.util.Collection;
import java.util.Map;

import com.dotmarketing.exception.DotDataException;
import com.liferay.portal.SystemException;
import com.liferay.portal.model.Portlet;

public interface PortletFactory {

  public Collection<Portlet> getPortlets() throws SystemException;

  Portlet findById(String portletId) ;

  Portlet updatePortlet(Portlet portlet) throws DotDataException;

  public void deletePortlet(String portletId) throws DotDataException;

  Portlet insertPortlet(Portlet portlet) throws DotDataException;

  String portletToXml(Portlet portlet) throws DotDataException;

  Map<String, Portlet> xmlToPortlets(String[] xmlFiles) throws SystemException;

}
