const Card = ({ teamA, teamB, match }) => {
  return (
    <div className="rounded-xl border border-gray-300 p-4 text-center space-y-2">
      <span className="text-sm md:text-base text-gray-700 font-bold">
        {match.time}
      </span>
      <div className="flex space-x-6 justify-center items-center">
        <span className="uppercase">{teamA.slug}</span>
        <img src={`/imgs/flags/${teamA.slug}.png`} />
        <input
          type="number"
          className="bg-red-50 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
        />

        <span className="text-red-500 font-bold">X</span>

        <input
          type="number"
          className="bg-red-50 w-[55px] h-[55px] text-red-700 text-xl rounded-md text-center"
          min={0}
        />
        <img src={`/imgs/flags/${teamB.slug}.png`} />
        <span className="uppercase">{teamB.slug}</span>
      </div>
    </div>
  );
};

export default Card;
