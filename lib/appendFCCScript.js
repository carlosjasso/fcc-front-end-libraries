export default function appendFCCScript() {
    const fccScript = document.getElementById("fcc-script");
    if (fccScript == null) {
        const script = document.createElement("script");
        script.id = "fcc-script";
        script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
        script.async = true;
        document.body.appendChild(script);
    }
}