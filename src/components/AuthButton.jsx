import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <button class="bg-gray-700 text-white p-3 w-25 rounded-full border-5 border-violet-400 drop-shadow-lg" onClick={() => loginWithRedirect()}>Log In</button>;
}

export function LogoutButton() {
  const { logout } = useAuth0();
  return <button class="bg-gray-700 text-white p-3 w-25 rounded-full border-5 border-violet-400 drop-shadow-lg" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>;
}

export function SignUpButton() {
  const { loginWithRedirect } = useAuth0();
  return <button class="bg-gray-700 text-white p-3 w-25 rounded-full border-5 border-violet-400 drop-shadow-lg" onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign Up</button>;
}