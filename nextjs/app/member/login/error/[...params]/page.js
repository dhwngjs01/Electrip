import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();
  const params = router.query.params;

  console.log(params);

  return (
    <div>
      <h1>404 Error</h1>
      <p>Page not found</p>
    </div>
  );
}
