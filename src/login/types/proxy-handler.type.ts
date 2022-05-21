import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler
} from 'aws-lambda';

export type ProxyHandler = Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
>;
