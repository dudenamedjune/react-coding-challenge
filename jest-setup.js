import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow } from '@material-ui/core/test-utils';
Enzyme.configure({ adapter: new Adapter() });