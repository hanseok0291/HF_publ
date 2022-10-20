function Error({ statusCode, err }) {
  return (
    <>
      {statusCode
        ? `${statusCode} server error2`
        : "오류가 발생하였습니다. 다시 시도해주세요."}
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
