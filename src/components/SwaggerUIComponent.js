import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function SwaggerUIComponent() {
  const specUrl = useBaseUrl("/training-api-docusaurus.yaml");

  return <SwaggerUI url={specUrl} />;
}
