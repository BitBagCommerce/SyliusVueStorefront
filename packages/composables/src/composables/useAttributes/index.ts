import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const composableName = 'useAttributes';

export const useAttributes = () => {
  const context = useVSFContext();
  const attributes = sharedRef(null, composableName);
  const loading = sharedRef(false, `${composableName}-loading`);
  const error = sharedRef({ load: null }, `${composableName}-error`);

  const load = async (params) => {
    try {
      loading.value = true;

      const response = await context.$sylius.api.getProductAttribute(params);

      response.forEach(attr => {
        if (attr.type === 'text') {
          attr.options = attr.options.map(option => ({
            ...option,
            selected: params.attributes[option.code]?.includes(option.stringValue) || false
          }));

          return;
        }

        if (params.attributes?.[attr.id]) {
          attr.options[0].selected = true;
          attr.range = params.attributes[attr.id];

          return;
        }

        attr.options[0].selected = false;
      });

      attributes.value = response;
      loading.value = false;
    } catch (error) {
      attributes.value = [];
      error.value.load = error;
      Logger.error(`${composableName}/load`, error);
    }
  };

  return {
    attributes: computed(() => attributes.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load
  };
};
