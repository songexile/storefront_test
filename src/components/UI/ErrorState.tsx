type ErrorStateProps = {
    message: string;
  };
  
  function ErrorState({ message }: ErrorStateProps) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error: {message}</p>
      </div>
    );
  }
  
  export default ErrorState;
  