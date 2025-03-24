const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"
      style={{
        background: "transparent",
        borderTopColor: "#3B82F6",
        borderRightColor: "#8B5CF6",
        borderWidth: "6px",
      }}
    ></div>
  </div>
);

export default Spinner;
