import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { checkisvwandconverttomobilescerrrnwidth, checkitisinwidth, isStringInteger, mobileik } from "./utils/vierw";
import { cssValueOptions } from "./utils/cssdefault";
import { NavContext } from "./App";

type Styles = Record<string, string | number>;

export default function ButtonEditor({
  csscustem,
  slecetdelemnt,
  elenttype,
  checkedasmobile,
  setmobarr,
  mapref,
  lapref,
  oldmobmap
}: {
  csscustem: Styles | null;
  slecetdelemnt: string | null;
  elenttype: string | null;
  checkedasmobile: Boolean;
  setmobarr: Set<any>;
  mapref: Map<string, any>,
  lapref: Map<string, any>,
  oldmobmap: Map<string, any>,
}) {

  const context = useContext(NavContext);

  if (!context) {
    throw Error("context not found");
  }

  let { lapMapRef, mobMapRef, mobileoldmapstoreing } = context;

  let elementtype = slecetdelemnt?.split("").filter(el => !isStringInteger(el)).join("");

  const [styles, setStyles] = useState<Styles>({});

  useLayoutEffect(() => {
    if (csscustem) {
      setStyles(csscustem);
    }
  }, [csscustem]);

  let maximumwidth = useMemo(() => {
    if (checkedasmobile) {
      return mobileik.x;
    }
    return window.innerWidth;
  }, [checkedasmobile]);

  useEffect(() => {

    if (slecetdelemnt && elenttype) {

      let maindiv = document.querySelector(`#${slecetdelemnt}`);
      let elemet = maindiv?.querySelector(`#${slecetdelemnt}`) as HTMLElement;

      let oldmobmapobj = mobileoldmapstoreing.current.get(slecetdelemnt);
      let elementfrommap = mobMapRef.current.get(slecetdelemnt);
      let lapelementmap = lapMapRef.current.get(slecetdelemnt);

      Object.entries(styles).forEach((el: [string, string | number]) => {

        let [name, value] = el;

        if (name == "text") {
          elemet.innerHTML = value as string;
        }

        if (name == "placeholder") {
          let el = elemet as HTMLInputElement;
          el.placeholder = value as string;
        }

        if (lapelementmap) {
          lapelementmap[name] = value;
        }

        let mobilescreenelementvalue =
          checkisvwandconverttomobilescerrrnwidth(name, value as string, maximumwidth, checkedasmobile);

        if (elementfrommap) {
          elementfrommap[name] = value;
        }

        if (name == "width" && checkedasmobile) {

          if (!elementfrommap?.width?.includes("vw")) {

            let valueinvw = (parseInt(value as string) / mobileik.x) * 100 + "vw";
            elementfrommap.width = valueinvw;

          } else {
            elementfrommap.width = value;
          }

        }

        if (oldmobmapobj) {
          oldmobmapobj[name] = mobilescreenelementvalue;
        }

        (elemet.style as any)[name] = mobilescreenelementvalue;

      });

      if (oldmobmapobj) {
        mobileoldmapstoreing.current.set(slecetdelemnt, oldmobmapobj);
      }

      if (checkedasmobile && elementfrommap) {
        mobMapRef.current.set(slecetdelemnt, elementfrommap);
      }

      if (!checkedasmobile && lapelementmap) {
        lapMapRef.current.set(slecetdelemnt, lapelementmap);
      }

    }

  }, [styles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    let { status, valueas } = checkitisinwidth(name, value, maximumwidth, checkedasmobile);

    if (!status) return;

    setStyles((prev) => ({
      ...prev,
      [name]: valueas,
    }));

  };

  return (

    <div className="flex h-screen z-40">

      <div
        className="
        w-full max-w-md
        bg-white
        dark:bg-neutral-900
        rounded-2xl
        shadow-2xl
        p-6
        overflow-y-auto
        border
        border-neutral-200
        dark:border-neutral-700
        "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-6
          sticky
          top-0
          bg-white
          dark:bg-neutral-900
          text-neutral-800
          dark:text-white
          z-10
          "
        >
          🎨 {elementtype} Editor
        </h2>

        <div className="space-y-5 pb-12">

          {styles && Object.entries(styles).map(([name, value]) => (

            <Field
              key={name}
              label={name}
              name={name}
              value={value}
              onChange={handleChange}
            />

          ))}

        </div>

      </div>

    </div>

  );

}

/* FIELD */

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  const options = cssValueOptions[name];
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (optionValue: string) => {

    const fakeEvent = {
      target: {
        name,
        value: optionValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
    setShowOptions(false);

  };

  return (

    <div className="relative">

      <label
        className="
        text-sm
        font-medium
        text-neutral-600
        dark:text-neutral-300
        "
      >
        {label}
      </label>

      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        onFocus={() => setShowOptions(true)}
        className="
        mt-1
        w-full
        rounded-lg
        border
        border-neutral-300
        dark:border-neutral-700
        px-3
        py-2
        text-sm
        text-black
        dark:text-white
        bg-white
        dark:bg-neutral-800
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        "
      />

      {options && showOptions && (

        <div
          className="
          mt-2
          flex
          flex-wrap
          gap-2
          bg-white
          dark:bg-neutral-800
          p-2
          rounded-lg
          border
          border-neutral-200
          dark:border-neutral-700
          shadow-lg
          max-h-40
          overflow-auto
          "
        >

          {options.map((opt) => (

            <div
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className="
              px-3
              py-1
              text-xs
              bg-neutral-100
              dark:bg-neutral-700
              text-neutral-700
              dark:text-neutral-200
              rounded-md
              cursor-pointer
              hover:bg-blue-500
              hover:text-white
              transition
              "
            >
              {opt}
            </div>

          ))}

        </div>

      )}

    </div>

  );

}