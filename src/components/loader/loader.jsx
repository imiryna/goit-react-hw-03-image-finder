import { Rings } from 'react-loader-spinner';
import { LoaderContainer } from './loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <Rings
        height="300"
        width="300"
        color="#7d7fefcc"
        radius="5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </LoaderContainer>
  );
};
