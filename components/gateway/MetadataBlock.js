const MetadataBlock = ({ title, content }) => (
  <div className="flex flex-col basis-1/2 mb-4 md:mb-0 flex-1">
    <p className="font-bold text-wall-400">{title}</p>
    <p className="font-mono">{content}</p>
  </div>
);

export default MetadataBlock;
