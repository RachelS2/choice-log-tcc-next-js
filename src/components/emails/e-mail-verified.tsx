import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const EmailVerifiedEmail = (username: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return (
    <Html dir="ltr" lang="en">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] font-bold text-[24px] text-gray-900">
                Your email address has been verified!
              </Text>

              <Text className="mt-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                {username}, thanks for signing up! Your email address has been successfully verified. You can now access all the features of ChoiceLog and 
                start tracking your shopping experiences.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  className="box-border rounded-[6px] bg-blue-600 px-[32px] py-[12px] font-medium text-[16px] text-white no-underline"
                  href={baseUrl + "/sign-in"}
                >
                  Start Using ChoiceLog
                </Button>
              </Section>

              <Hr className="my-[24px] border-gray-200" />

              <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
                Best regards,
                <br />
                ChoiceLog team.
              </Text>
            </Section>

            <Section className="mt-[32px] border-gray-200 border-t pt-[24px]">
              <Text className="m-0 text-center text-[12px] text-gray-400 leading-[16px]">
                Choice Log
                <br />
                Made By Rachel Barino Silva as a Final Project (TCC) for a Information Systems Degree at Universidade Federal Fluminense (UFF)
                <br />
                Niterói, Rio de Janeiro - Brazil 
              </Text>

              <Text className="m-0 mt-[8px] text-center text-[12px] text-gray-400 leading-[16px]">
                © 2026 Choice Log. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerifiedEmail;