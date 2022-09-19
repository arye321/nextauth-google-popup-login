
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  if (status === "authenticated") {
    return (
      <div>

        < h2 > Welcome {session.user.email} 😀</h2 >
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  else if (status === "unauthenticated") {
    return (

      <div>

        <h2>Please Login</h2>
        <button onClick={() => popupCenter("/google-signin", "Sample Sign In")} >
          Sign In with Google
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
