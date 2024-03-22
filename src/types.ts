/**
 * The environment of the purchase
 */
export type Environment = "sandbox" | "prod";

/**
 * Webhook event names
 */
export type EventName =
  | "trial_started"
  | "trial_converted"
  | "trial_cancelled"
  | "trial_expired"
  | "trial_still_active"
  | "trial_billing_retry_entered"
  | "subscription_started"
  | "subscription_renewed"
  | "subscription_refunded"
  | "subscription_canceled"
  | "subscription_upgraded"
  | "subscription_expired"
  | "subscription_product_changed"
  | "subscription_billing_retry_entered"
  | "in_app_purchase";

/**
 * Webhook events
 */
export interface Event {
  event_name: EventName;
  user_id: string;
  custom_user_id: string;
  identity_id: string;
  advertiser_id: string;
  time: number;
  created_at: number;
  product_id: string;
  revenue?: {
    value: number;
    value_usd: number;
    currency: string;
    is_proceed?: 0 | 1;
    proceeds_rate?: number;
  };
  price: {
    value: number;
    value_usd: number;
    currency: string;
  };
  transaction: {
    transaction_id: number;
    original_transaction_id: number;
    expires: number;
    grace_period_expires: number;
  };
  device_id?: string;
  app_version?: string;
  sdk_version?: string;
  environment: Environment;
  platform?: "iOS" | "android";
  ip?: string;
  country?: string;
  old_product_id?: string;
  new_product_id?: string;
}

export interface User {
  /**
   * Time at which the user was created. Measured in seconds since the Unix epoch.
   */
  created: number;
  /**
   * prod or sandbox. Use sandbox environment for testing purpose, such as testing automation
   * or testing at store sandbox.
   */
  environment: Environment;
  /**
   * Qonversion User ID
   */
  id: string;
  /**
   * User Identity ID - unique user ID from a partner authorization system.
   * Partners can use identity for cross-platform / cross-device access management.
   * See docs for additional info.
   */
  identity_id: string;
}

export interface CreateUser {
  /**
   * Time at which the user was created. Measured in seconds since the Unix epoch.
   */
  created: number;
  /**
   * Qonversion User ID
   */
  id: string;
  /**
   * prod or sandbox. Use sandbox environment for testing purpose, such as testing automation
   * or testing at store sandbox.
   */
  environment: Environment;
}

export interface UserProperty {
  /**
   * The property key, may be either custom or Qonversion-defined.
   * Qonversion-defined keys start from _q_ substring
   */
  key: string;
  /**
   * The value of the property
   */
  value: string;
}

export interface CreateUserProperty {
  /**
   * The saved properties that were successfully created
   */
  savedProperties: UserProperty[];
  /**
   * Properties that failed to be created
   */
  propertyErrors: {
    /**
     * The key of the property that failed to be created
     */
    key: string;
    /**
     * The error message for the property
     */
    error: string;
  }[];
}

export interface Identity {
  /**
   * User Identity ID.
   */
  id: string;
  /**
   * Qonversion User is the unique installation of your application. By default, Qonversion User ID
   * is generated with the Qonversion SDK and identifies the user without additional
   * identification from the partner side.
   */
  user_id: string;
}

export interface Entitlement {
  /**
   * The entitlement ID. For example, premium or pro.
   */
  id: string;
  /**
   * "True" means a user has active entitlement.
   * Please note, active = true does not mean that a subscription will be renewed.
   * A user can have active entitlement, while auto-renewal for the subscription was switched off.
   */
  active: boolean;
  /**
   * Time at which the entitlement was started. Measured in seconds since the Unix epoch.
   */
  started: number;
  /**
   * 	The expiration time for the entitlement is measured in seconds since the
   *  Unix epoch and denotes when the entitlement will no longer be available.
   */
  expires: number;

  /**
   * Source of the purchase via which the entitlement was activated.
   * Values:
   * – appstore: App Store
   * – playstore: Play Store
   * – stripe: Stripe
   * – unknown: unable to detect the source
   * – manual: the entitlement was activated manually
   */
  source: "appstore" | "playstore" | "stripe" | "unknown" | "manual";
  /**
   * A product granted in the entitlement.
   */
  product: {
    /**
     * The product identifier in Qonversion.
     */
    product_id: string;
    /**
     * Subscription linked to the product. Exists only for subscription type products.
     */
    subscription?: {
      /**
       * Possible values:
       * – normal: the product is in it's normal period
       * – trial: free trial period
       * – intro: introductory pricing period
       */
      current_period_type: "normal" | "trial" | "intro";
      /**
       * A renewal state of the product. It can have the following values:
       * – will_renew: subscription is active, and auto-renew status is on
       * – canceled: auto-renew status is off
       * – billing_issue: there was some billing issue.
       */
      renewal_state: "will_renew" | "canceled" | "billing_issue";
    };
  };
}
