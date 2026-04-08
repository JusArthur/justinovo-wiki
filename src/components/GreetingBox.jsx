const GreetingBox = () => {
    return (
      <article className="glass-card flex flex-col items-center justify-center text-center w-[360px] h-[288px] relative rounded-3xl">
        
        {/* Avatar Link */}
        <a href="/live2d" className="block transition-transform hover:scale-105 duration-300">
          <img 
            src="/assets/avatar.jpg"
            alt="Justin avatar" 
            className="mx-auto rounded-full object-cover opacity-90 border-2 border-green-500/50"
            style={{ 
              width: '120px', 
              height: '120px', 
              boxShadow: 'rgba(34, 197, 94, 0.2) 0px 16px 32px -5px' 
            }} 
          />
        </a>
  
        {/* Greeting Text */}
        <h1 className="font-averia mt-4 text-2xl text-gray-100 leading-[1.4]">
          Good Afternoon <br />
          I'm <span className="text-linear text-[32px] font-bold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">Justin</span> , Nice to <br />
          meet you!
        </h1>
        
      </article>
    );
  };
  
  export default GreetingBox;