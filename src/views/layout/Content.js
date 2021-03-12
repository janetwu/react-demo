import React, {useState, useEffect, useMemo} from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import routeList from "@/router/routeList";

import Error from '@/views/error'
import Test from '@/views/test'

const { Content } = Layout;

const LayoutContent = (props) => {
  const { location } = props;
  const { pathname } = location;
  return (
		<Content style={{ height: "calc(100% - 100px)", padding: '20px' }}>
			<Switch location={location}>
				<Route exact path="/error/404" component={Error} />
				<Route exact path="/test" component={Test} />
				{routeList.map((route) => (
					<Route
							component={route.component}
							key={route.path}
							exact
							path={route.path}
					/>)
							
				)}
				<Redirect to="/error/404"/>
			</Switch>
		</Content>
  );
};

export default withRouter(LayoutContent)
