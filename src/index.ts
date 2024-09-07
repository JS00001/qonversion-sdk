import axios from "axios";

import * as Qonversion from "./types";

class QonversionClient {
  private secretKey: string;
  private projectKey: string;
  private baseUrl = "https://api.qonversion.io/v3";

  constructor(secretKey: string, projectKey: string) {
    this.secretKey = secretKey;
    this.projectKey = projectKey;
  }

  /**
   * GET /v3/users/:id
   * Get a users information using theit qonversion user id
   */
  public async getUser(userId: string) {
    const url = `${this.baseUrl}/users/${userId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.get(url, config);

      return res.data as Qonversion.User;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * POST /v3/users/:id
   * Create a new user using a custom user id
   */
  public async createUser(userId: string, environment: Qonversion.Environment) {
    const url = `${this.baseUrl}/users/${userId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.post(url, { environment }, config);

      return res.data as Qonversion.CreateUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * GET /v3/users/:id/properties
   * Retrieve a users properties using their qonversion user id
   */
  public async getUserProperties(userId: string) {
    const url = `${this.baseUrl}/users/${userId}/properties`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.get(url, config);

      return res.data as Qonversion.UserProperty[];
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST /v3/users/:id/properties
   * Set a users properties using their qonversion user id
   */
  public async setUserProperties(
    userId: string,
    properties: Qonversion.UserProperty[]
  ) {
    const url = `${this.baseUrl}/users/${userId}/properties`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.post(url, properties, config);

      return res.data as Qonversion.CreateUserProperty;
    } catch (error) {
      throw error;
    }
  }

  /**
   * GET /v3/identities/:id
   * Get a users information using their qonversion identity id
   */
  public async getIdentity(identityId: string) {
    const url = `${this.baseUrl}/identities/${identityId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.get(url, config);

      return res.data as Qonversion.Identity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST /v3/identities/:id
   * Create a new identity using a custom identity id
   */
  public async createIdentity(id: string, userId: string) {
    const url = `${this.baseUrl}/identities/${id}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.post(url, { user_id: userId }, config);

      return res.data as Qonversion.Identity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * GET /v3/users/:userId/entitlements
   * Get a users entitlements using their qonversion user id
   */
  public async getEntitlements(userId: string) {
    const url = `${this.baseUrl}/users/${userId}/entitlements`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.projectKey}`,
      },
    };

    try {
      const res = await axios.get(url, config);

      return res.data as { data: Qonversion.Entitlement[] };
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST /v3/users/:userId/entitlements
   * Grant entitlements to a user using their qonversion user id
   */
  public async grantEntitlement(
    userId: string,
    entitlementId: string,
    expires: number
  ) {
    const url = `${this.baseUrl}/users/${userId}/entitlements`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
    };

    const data = {
      id: entitlementId,
      expires,
    };

    try {
      await axios.post(url, data, config);
    } catch (error) {
      throw error;
    }
  }

  /**
   * DELETE /v3/users/:userId/entitlements/:entitlementId
   * Revoke entitlements from a user using their qonversion user id
   */
  public async revokeEntitlement(userId: string, entitlementId: string) {
    const url = `${this.baseUrl}/users/${userId}/entitlements/${entitlementId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
    };

    try {
      await axios.delete(url, config);
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST /v3/users/:userId/purchases
   * Create a new purchase for a user using their qonversion user id
   */
  public async createPurchase(
    userId: string,
    price: string,
    currency: string,
    stripeStoreData: {
      subscription_id: string;
      product_id: string;
    }
  ) {
    const url = `${this.baseUrl}/users/${userId}/purchases`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
    };

    const data = {
      price,
      currency,
      stripe_store_data: stripeStoreData,
    };

    try {
      await axios.post(url, data, config);
    } catch (error) {
      throw error;
    }
  }
}

export default QonversionClient;

export * from "./types";
