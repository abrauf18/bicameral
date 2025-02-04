
import clsx from 'clsx';
import { Link } from 'react-router-dom';



const SidebarItem = ({
  title,
  Icon,
  path,
  className,
  onClick,
}) => {
  console.log(Icon)
  return (
    <Link
      href={path}
      className={clsx(
        'flex items-center md:justify-start justify-center gap-3 w-full px-4 py-3 transition-colors hover:bg-primary/90 hover:text-white rounded-md',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-6 w-6 lg:h-6 lg:w-6">
        <Icon className="h-3/4 w-3/4" />
      </div>
      <span className="hidden md:block text-left">{title}</span>
    </Link>
  );
};

export default SidebarItem;
