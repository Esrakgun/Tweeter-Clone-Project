


const Content = ({ data }) => {
  console.log(data);

  return (
    <div className="my-2">
      {data.text && <p>{data.text}</p>}
      {data.image && <img src={data.image} alt="" className="rounded-xl my-2" />}
    </div>
  )
}

export default Content;
