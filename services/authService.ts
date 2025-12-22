interface LoginBody {
  user: {
    email: string;
    password: string;
  };
}
export async function login(body: LoginBody): Promise<Response> {
  const res = await fetch(`${process.env.API_URL}/api/v1/users/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  return res;
}

interface SignupBody {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export async function signup(props: SignupBody): Promise<Response> {
  const res = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      user: {
        email: props.email,
        name: props.name,
        password: props.password,
        password_confirmation: props.passwordConfirmation,
      },
    }),
  });

  return res;
}
