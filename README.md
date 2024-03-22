# Qonversion SDK

The Qonversion SDK is an npm package that allows easy access to the Qonversion API in JavaScript and TypeScript projects. It is well-documented with js/ts examples, making it simpler for developers to access the functionality provided by the API without the need for a deep-dive into Qonversion's documentation.

## Installation

Install qonversion-sdk using **npm**

```bash
npm install qonversion-sdk
```

Install qonversion-sdk using **yarn**

```bash
yarn add qonversion-sdk
```

### See Sections [Demo](#demo-code)

## Demo Code

```javascript
import QonversionClient from "qonversion-sdk";

const qonversionClient = new QonversionClient(secretKey, projectKey);

// Call the get identity function
qonversionClient
  .getIdentity("USER ID")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Demo Response

```javascript
{
  "id": string;
  "user_id": string;
}
```

## Demo (Using Require)

```javascript
const QonversionClient = require("qonversion-sdk").default;

const qonversionClient = new QonversionClient(secretKey, projectKey);

// Call the get identity function
qonversionClient
  .getIdentity("USER ID")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Demo Response

```javascript
{
  "id": string;
  "user_id": string;
}
```

## API

#### .getUser(userId: string)

Get a user based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.

**Response**

```javascript
{
  id: string;
  created: number;
  environment: Environment;
  identity_id: string;
}
```

#### .createUser(userId: string, environment: Qonversion.Environment)

Create a user using a custom user ID.

**Parameters**

- `userId` \[required\] - The custom user ID.
- `environment` \[required\] - The environment in which the user is created.

**Response**

```javascript
{
  id: string;
  created: number;
  environment: Qonversion.Environment;
}
```

#### .getUserProperties(userId: string)

Get a user's properties based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.

**Response**

```javascript
[
  {
    key: string;
    value: string;
  },
  {
    key: string;
    value: string;
  }
]

```

#### .setUserProperties(userId: string, properties: Qonversion.UserProperties)

Set a user's properties based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.
- `properties` \[required\] - The properties to set.

**Response**

```javascript
{
  savedProperties: [
    {
      key: string;
      value: string;
    },
    {
      key: string;
      value: string;
    }
  ],
  propertyErrors: [
    {
      key: string;
      error: string;
    },
    {
      key: string;
      error: string;
    }
  ];
}
```

#### .getIdentity(identityId: string)

Get a Qonversion user ID based on a custom user ID.

**Parameters**

- `identityId` \[required\] - The custom user ID.

**Response**

```javascript
{
  id: string;
  user_id: string;
}
```

#### .createIdentity(identityId: string, userId: string)

Create a new identity using a custom identity id

**Parameters**

- `identityId` \[required\] - The custom identity ID.
- `userId` \[required\] - The Qonversion user ID.

**Response**

```javascript
{
  id: string;
  user_id: string;
}
```

#### .getEntitlements(userId: string)

Get a user's entitlements based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.

**Response**

```javascript
{
  data: [
    {
      id: string;
      active: boolean;
      started: number;
      expires: number;
      product: {
        product_id: string;
        subscription?: {
          current_period_type: "normal" | "trial" | "intro";
          renewal_state: "will_renew" | "canceled" | "billing_issue";
        };
      };
    }
  ]
}
```

#### .grantEntitlement(userId: string, entitlementId: string, expires: number)

Grant an entitlement to a user based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.
- `entitlementId` \[required\] - The entitlement ID.

**No response**

#### .revokeEntitlement(userId: string, entitlementId: string)

Revoke an entitlement from a user based on their Qonversion user ID.

**Parameters**

- `userId` \[required\] - The Qonversion user ID.

**No response**
