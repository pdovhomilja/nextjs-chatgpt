const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
      <div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5"></div>
          <h2>Examples</h2>
        </div>
        <div className="space-y-2">
          <p className="infoText">Text 1</p>
          <p className="infoText">Text 2</p>
          <p className="infoText">Text 3</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
