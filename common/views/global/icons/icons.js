import Icon from '../../components/Icon/Icon';

export default (props) => (
  <div>
    {props.allIcons.map(icon => (
      <div className='styleguide__icon'>
        <p className='styleguide__icon__id'>{icon.name}</p>
        <Icon name={icon.name} />
      </div>
    ))}
  </div>
);
