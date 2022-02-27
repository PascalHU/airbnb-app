<h1 align="center">AirBnb Copy -  React Native</h1>

## How it work ?

You must Sign In to be able to view Offer, to see what's up for "rent" arround you, and modify your profile.
No request is send to BackEnd if you try to update your profile with out changing anything.

## Props

### Sign Up

| Name                 | Type   | Required | Description                           | Example                                             |
| -------------------- | ------ | -------- | ------------------------------------- | --------------------------------------------------- |
| `email`              | string | Yes      | User Email Adress (needed for SignIn) | `email = JohnDoe@gmail.com`                         |
| `username`           | string | Yes      | Username of member.                   | `username="John Doe"`                               |
| `description`        | string | Yes      | Description of member.                | `description="Full-time Traveller. Globe Trotter."` |
| `password`           | string | Yes      | Your Password (needed for SignIn)     | `password=your_password`                            |
| `ConfirmPassassword` | string | Yes      | Must match password to signup         | `confirmPassword=your_password`                     |

### Sign In

| Name       | Type   | Required | Description       | Example                     |
| ---------- | ------ | -------- | ----------------- | --------------------------- |
| `email`    | string | Yes      | User Email Adress | `email = JohnDoe@gmail.com` |
| `password` | string | Yes      | Your password     | `password=your_password`    |

### Profile

| Name          | Type   | Required | Description                           | Example                                             |
| ------------- | ------ | -------- | ------------------------------------- | --------------------------------------------------- |
| `email`       | string | Yes      | User Email Adress (needed for SignIn) | `email = JohnDoe@gmail.com`                         |
| `username`    | string | Yes      | Username of member.                   | `username="John Doe"`                               |
| `description` | string | Yes      | Description of member.                | `description="Full-time Traveller. Globe Trotter."` |
| `image`       | string | Yes      | Must match password to signup         | `image="https://...`                                |

#### Developped with ReactNative/Expo
