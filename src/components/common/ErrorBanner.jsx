const ErrorBanner = ({ message, type }) => {
  return (
    <>
      <div
        role="alert"
        className={"alert alert-" + type + " alert-soft my-5 w-1/4"}
      >
        <span className="text-sm font-bold">{message}</span>
      </div>
    </>
  );
};

export default ErrorBanner;
