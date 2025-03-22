interface LoadingStateProps {
    message?: string; // Optional prop with default value
  }
  
  function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">{message}</p>
      </div>
    );
  }
  
  export default LoadingState;
  