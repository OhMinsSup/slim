import babel from "rollup-plugin-babel";

export default {
  plugins: [
    babel({
      include: "src/**",
      plugins: [
        "external-helpers"
      ]
    })
  ]
};
