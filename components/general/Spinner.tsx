function Spinner() {
  const renderSpinner = () => {
    return (
      <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-slate-500"></div>
    );
  };
  return <>{renderSpinner()}</>;
}

export default Spinner;
