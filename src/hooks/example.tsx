import type { InferGetServerSidePropsType } from "next";

interface IData {
  title: string;
  value: number;
}

export const getServerSideProps = async () => {
  const data: IData = await new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        title: "test",
        value: 1924
      });
    }, 3000)
  );

  return {
    props: data
  }
}

export const Example = ({ title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>{title}</div>
  )
}
