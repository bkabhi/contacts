import { Link } from 'react-router-dom';
import { rootService } from '../routes/RootService';
import { startCase } from 'lodash';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {startCase(pageName)}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to={rootService.Contacts}>Dashboard /</Link>
          </li>
          <li className="text-primary">{startCase(pageName)}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
