import GpuPriceChecker from '../components/GpuPriceChecker';

const PostListing = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Post Your Graphics Card</h2>
      <GpuPriceChecker />
      {/* Other form fields can be added here later */}
    </div>
  );
};

export default PostListing;
