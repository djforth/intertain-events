
module.exports = function(props){
  let src = props.asset.get('src');
  let alt = props.asset.get('alt');
  return (<img src={src} alt={alt} />);
};
