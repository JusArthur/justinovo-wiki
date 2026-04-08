// ==========================================
// 3. Greeting Component (Good Afternoon Box)
// ==========================================
const GreetingBox = () => {
    return (
      <article className="glass-card flex flex-col items-center justify-center text-center w-[360px] h-[288px] relative rounded-3xl">
        
        {/* Avatar Link */}
        <a href="/live2d" className="block transition-transform hover:scale-105 duration-300">
          <img 
            src="/assets/avatar.jpg"
            alt="Ivy avatar" 
            className="mx-auto rounded-full object-cover"
            style={{ 
              width: '120px', 
              height: '120px', 
              boxShadow: 'rgb(226, 217, 206) 0px 16px 32px -5px' 
            }} 
          />
        </a>
  
        {/* Greeting Text */}
        {/* Note: I added leading-snug or leading-relaxed here to make the line spacing look natural */}
        <h1 className="font-averia mt-4 text-2xl text-gray-800 leading-[1.4]">
          Good Afternoon <br />
          I'm <span className="text-linear text-[32px] font-bold text-[#35bfab]">Ivy</span> , Nice to <br />
          meet you!
        </h1>
        
      </article>
    );
  };
  
  export default GreetingBox;