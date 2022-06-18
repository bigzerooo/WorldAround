namespace WorldAround.Application.Helpers;

public static class ImageHelper
{
    private const string basePath = "https://wolrdaroundstorage.blob.core.windows.net/images/";

    public static string CreateUrl(string imageName)
    {
        return basePath + imageName;
    }
}
