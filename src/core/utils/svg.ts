const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
// @ts-ignore
const req = require.context('@/assets/svg', false, /\.svg$/);
requireAll(req);
