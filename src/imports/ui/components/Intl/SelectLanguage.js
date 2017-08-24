const SelectLanguage = ({ actions, intlState, intl }) => {
  const handleChange = event => {
    if (event.target.value === 'es') {
      actions.setLocaleSpanish();
    } else if (event.target.value === 'en') {
      actions.setLocaleEnglish();
    }
  };

  return (
    <select name="language" value={intlState.locale} onChange={handleChange}>
      <option value="es">
        {intl.formatMessage({ id: 'auth.switch.titleSpanish' })}
      </option>
      <option value="en">
        {intl.formatMessage({ id: 'auth.switch.titleEnglish' })}
      </option>
    </select>
  );
};

export default SelectLanguage;
