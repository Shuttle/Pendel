# Identities

An identity has one primary `Name` plus any number of alternate names. Alternate names let an identity keep its
history, roles, and permissions while being known by more than one value — a sign-in name changed at an OAuth
provider, or a legacy name retained after a rename — without having to re-provision it under a new identity.

## Alternate name endpoints

| Endpoint | Purpose |
| --- | --- |
| `POST /v1/identities/{id}/alternate-names` | Adds an alternate name |
| `DELETE /v1/identities/{id}/alternate-names/{name}` | Removes an alternate name |
| `PATCH /v1/identities/{id}/alternate-names/promotion` | Promotes an alternate name to be the primary name |

All three are authorized against `AccessPermissions.Identities.Register` — the same permission required to register
an identity — and are available on `IAccessClient.Identities` via [Shuttle.Access.RestClient](/shuttle-access/rest-client).

An alternate name has to be unique across *all* identities, the same as a primary name; adding a name already in use
by another identity fails.

## Signing in with an alternate name

Signing in, and any identity search by `Name` or `NameMatch`, matches the primary name *or* any alternate name — once
added, an alternate name can be used to sign in immediately:

```json
{
  "identityName": "legacy-sign-in-name",
  "password": "..."
}
```

succeeds equally whether `legacy-sign-in-name` is the identity's primary name or one of its alternate names. See
[Sessions](/shuttle-access/sessions) for how the session that comes back distinguishes the name used to sign in
(`SignInName`) from the identity's current primary name (`IdentityName`).

## Promoting an alternate name

`PATCH /v1/identities/{id}/alternate-names/promotion` makes an existing alternate name the primary name:

```json
{
  "name": "new-primary-name",
  "mode": 1
}
```

`mode` selects what happens to the *previous* primary name:

| Mode | Effect |
| --- | --- |
| `1` — `Replace` | The alternate becomes the primary name; the previous primary name is discarded and can no longer be used to sign in. |
| `2` — `Swap` | The alternate becomes the primary name; the previous primary name becomes an alternate. |

`Swap` is the one to use when the rename should be reversible — a caller can later promote the original name back.
`Replace` is the one to use when the previous name should stop resolving entirely, for example once you are certain
nothing still signs in with it.
