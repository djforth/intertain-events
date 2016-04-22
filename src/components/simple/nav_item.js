
module.exports = function(props){
  let css = `osw_l alpha button button_tertiary cardboard ${props.active}`;
  return (
    <li>
      <a className={css} href="#" onClick={props.onclick}>
        {props.title}
      </a>
    </li>
  );
};
