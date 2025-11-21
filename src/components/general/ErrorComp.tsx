function ErrorComp({ errorMessage }: { errorMessage: string }) {
  return <p className="text-sm text-red-600">{errorMessage}</p>;
}

export default ErrorComp;
