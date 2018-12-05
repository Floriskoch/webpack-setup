import '../../styles/toolkit.scss'

const requireAll = (r) => {
    r.keys().forEach(r);
}

export default function loadAssets() {
    // Load svgs
    requireAll(require.context('../../svgs/', true, /\.svg$/))
}

