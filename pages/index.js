import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";

function Titulo(props) {
  const Tag = props.tag;
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["700"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [userName, setUserName] = useState("");
  const [obj, setObj] = useState('');
  const roteamento = useRouter();
  useEffect(() => {
    const profileGit = async function () {
     await fetch(`https://api.github.com/users/${userName}`)
        .then((resp) => resp.json())
        .then((data) => {
          setObj(data)
        })
        .catch((erro) => {
          console.log(erro);
        });
    };
    profileGit();
  }, []);

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[100],
          backgroundImage:
            "url(https://mcdn.wallpapersafari.com/medium/46/32/JKeQ3d.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.primary[300],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log("Alguém submeteu o form");
              roteamento.push(`/chat?username=${userName}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Sejam Muito Bem Vindxs!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[100]
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              onChange={function (event) {
                console.log("usuario digitou", event.target.value);
                const valor = event.target.value;
                setUserName(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals['900'],
                  mainColor: appConfig.theme.colors.neutrals["000"],
                  mainColorHighlight: appConfig.theme.colors.primary['500'],
                  backgroundColor: appConfig.theme.colors.neutrals["000"],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary['500'],
                mainColorLight: appConfig.theme.colors.primary['400'],
                mainColorStrong: appConfig.theme.colors.primary['600'],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals['100'],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals['999'],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${userName}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              Username: {userName}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              Nome: {obj.name}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              Followers: {obj.followers} | Following: {obj.following}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
