import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/core.types";
import { logStep } from "utils/report/logStep.utils";

export class CustomersApi {
  constructor(private apiClient: IApiClient) {}
  //post
  //put
  //get by id
  //get all
  //get with pagination
  //delete
  @logStep("DELETE /api/customers/{id}")
  async delete(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.customerById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<null>(options);
  }
}