import Breadcrumb from '../components/Breadcrumb.tsx';
import LineChart from '../features/charts-and-maps/component/LineChart.tsx';
import Maps from '../features/charts-and-maps/component/Maps.tsx';
import { CasesType, casesTypes } from '../features/charts-and-maps/models/constants.ts';
import { rootService } from '../routes/RootService.ts';

const ChartsAndMaps = () => {
  const casesType: CasesType = casesTypes.cases;
  return (
    <>
      <Breadcrumb pageName={rootService.ChartsAndMaps} />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <LineChart casesType={casesType} />
        </div>
        <div className="col-span-12 mt-5">
          <Maps casesType={casesType} />
        </div>
      </div>
    </>
  );
};

export default ChartsAndMaps;
