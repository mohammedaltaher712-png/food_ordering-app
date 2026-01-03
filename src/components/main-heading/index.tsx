function MainHeading({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <>
      <span className='uppercase text-gray-500 font-semibold leading-4 font-sans'>
        {subTitle}
      </span>
      <h2 className='text-orange-500 font-bold text-4xl italic font-serif mt-4 '>{title}</h2>
    </>
  );
}

export default MainHeading;