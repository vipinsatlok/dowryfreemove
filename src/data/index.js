function inputData(values = {}) {
  const now = values.date ? values.date : new Date();
  const dateString = new Date(now).toISOString().substring(0, 10);

  return [
    {
      type: "text",
      value: values.he,
      id: "he",
      label: "Enter He (Male) name",
      placeholder: "Ex : Ayush Singh",
      svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
    {
      type: "text",
      id: "she",
      value: values.she,
      label: "Enter She (Female) name",
      placeholder: "Ex : Ayushi Singh",
      svg: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
    {
      type: "text",
      id: "state",
      value: values.state,
      label: "Enter State name",
      placeholder: "Ex : Uttar Pradesh",
      svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
    },
    {
      type: "text",
      id: "district",
      value: values.district,
      label: "Enter District name",
      placeholder: "Ex : Lucknow",
      svg: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
    },
    {
      type: "date",
      id: "date",
      value: dateString,
      label: "Select Marriage date",
      placeholder: "Ex : 01/01/2023",
      svg: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z",
    },
    {
      type: "file",
      value: values.image,
    },
    {
      type: "checkbox",
      value: values.varified,
    },
  ];
}

module.exports = {
  inputData,
};
