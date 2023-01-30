import { api } from "../utils/api";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

function CriarOcorrencias() {
  const { username } = useRouter().query;

  // ------ trcp stuff ------
  const { data, error } = api.ocorrencias.podeCriarOcorrencia.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
    }
  );

  const { data: profileData } = api.profile.getProfileFromUsername.useQuery(
    { username: username as string },
    {
      enabled: !!username,
    }
  );

  // ------------

  if (data === true) {
    interface Values {
      titulo: string;
      descricao: string;
      pontos: number;
    }

    return (
      <div className="w-full rounded border-2 border-red-900 p-4">
        <h2 className="text-xl font-bold">
          Criar ocorrência para: {profileData?.nome}
          <Formik
            initialValues={{
              titulo: "",
              descricao: "",
              pontos: 0,
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col gap-2">
              <label htmlFor="titulo" className="font-medium">
                Titulo
              </label>
              <Field id="titulo" name="titulo" placeholder="Falou mal" />

              <label htmlFor="descricao">Descrição</label>
              <Field
                id="descricao"
                className="border"
                name="descricao"
                placeholder="n gostou"
              />

              <label htmlFor="pontos">Pontos</label>
              <Field id="pontos" name="pontos" placeholder="0" type="number" />

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </h2>
      </div>
    );
  } else if (data === false) {
    console.log("Voce nao pode criar ocorrencias para essa pessoa");

    return <div>Criar ocorrencia para: </div>;
  } else {
    return null;
  }
}

export default CriarOcorrencias;
