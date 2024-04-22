import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';


const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
    <div
        ref={ref}
        component={Icon}
        icon={icon}
        sx={{ width: width, height: width, ...sx }}
        {...other}
    />
));
Iconify.displayName = "Iconify"

export default Iconify;