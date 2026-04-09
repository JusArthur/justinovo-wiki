const GreetingBox = ({ lang }) => {
  // Get current hour in 24-hour format
  const currentHour = new Date().getHours();

  // Determine the appropriate greeting based on time
  const getGreeting = (hour, isEnglish) => {
    if (5 <= hour && hour < 12) {
      return isEnglish ? "Good Morning" : "早上好";
    } else if (12 <= hour && hour < 20) {
      return isEnglish ? "Good Afternoon" : "下午好";
    } else {
      return isEnglish 
        ? "Have a magical day" 
        : "祝你拥有魔法般的一天";
    }
  };

  const greetingText = getGreeting(currentHour, lang === 'EN');

  return (
    <article className="glass-card hover-pop flex flex-col items-center justify-center text-center w-[360px] h-[288px] relative rounded-3xl">
      <a href="/live2d" className="block transition-transform">
        <img
          src="/assets/avatar.jpg"
          alt="Justin avatar"
          className="mx-auto rounded-full object-cover dark:brightness-90 dark:contrast-125"
          style={{
            width: "120px",
            height: "120px",
            boxShadow: "rgb(226, 217, 206) 0px 16px 32px -5px",
          }}
        />
      </a>

      <h1 className={`${lang === 'EN' ? 'font-greeting-en' : 'font-greeting-cn'} mt-4 text-2xl tracking-tight text-gray-800 dark:text-gray-100 leading-[1.4]`}>
        {lang === 'EN' ? (
          <>
            {greetingText} <br />
            I'm <span className="text-linear text-[32px] font-bold text-[#35bfab] dark:text-[#39ff14]">Justin</span>, Nice to <br />
            meet you!
          </>
        ) : (
          <>
            {greetingText} <br />
            我是 <span className="text-linear text-[32px] font-bold text-[#35bfab] dark:text-[#39ff14]">Justin</span>, 很高兴 <br />
            遇见你!
          </>
        )}
      </h1>
    </article>
  );
};

export default GreetingBox;