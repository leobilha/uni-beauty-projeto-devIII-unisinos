using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace API.Utils
{
    public class Util
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 10000;

        public static async Task<string> HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
                password,
                SaltSize,
                Iterations,
                HashAlgorithmName.SHA256))
            {
                var salt = algorithm.Salt;
                var key = algorithm.GetBytes(KeySize);
                var hash = new byte[SaltSize + KeySize];
                Buffer.BlockCopy(salt, 0, hash, 0, SaltSize);
                Buffer.BlockCopy(key, 0, hash, SaltSize, KeySize);
                return await Task.FromResult(Convert.ToBase64String(hash));
            }
        }

        public static async Task<bool> VerifyPassword(string password, string hashedPassword)
        {
            var hashBytes = Convert.FromBase64String(hashedPassword);
            var salt = new byte[SaltSize];
            Buffer.BlockCopy(hashBytes, 0, salt, 0, SaltSize);
            using (var algorithm = new Rfc2898DeriveBytes(
                password,
                salt,
                Iterations,
                HashAlgorithmName.SHA256))
            {
                var key = algorithm.GetBytes(KeySize);
                for (int i = 0; i < KeySize; i++)
                {
                    if (hashBytes[i + SaltSize] != key[i])
                    {
                        return await Task.FromResult(false);
                    }
                }
                return await Task.FromResult(true);
            }
        }

        public static async Task<string> RemoveSpecialCharacters(string value)
        {
            return await Task.FromResult(Regex.Replace(value, @"[^\d]", string.Empty));
        }
    }
}
